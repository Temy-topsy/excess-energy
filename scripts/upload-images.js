const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // Need to check if available, or just hardcode 'image/jpeg' since they are .jpg


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const slugs = ['1kva', '2.5kva', '3kva', '4kva', '5kva', '8kva'];
const imageDir = path.join(__dirname, '../public/images/services');
const bucketName = 'packages-media';

async function uploadImage(filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return "";
  }

  const fileBuffer = fs.readFileSync(filePath);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) {
    console.error(`Error uploading ${fileName}:`, error.message);
    return "";
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

async function runMigration() {
  for (const slug of slugs) {
    console.log(`Processing package: ${slug}`);

    // Map the local files
    // Note: 4kva and 5kva share a panel image in some cases, but let's check exact names
    const packageFile = path.join(imageDir, `excess-energy-services-${slug}.jpg`);
    const inverterFile = path.join(imageDir, `excess-energy-services-${slug}-inverter.jpg`);
    let panelFile = path.join(imageDir, `excess-energy-services-${slug}-panel.jpg`);
    
    if (slug === '4kva' || slug === '5kva') {
      panelFile = path.join(imageDir, 'excess-energy-services-4kva-5kva-panel.jpg');
    }

    const timestamp = Date.now();
    
    console.log(`Uploading images for ${slug}...`);
    const packageUrl = await uploadImage(packageFile, `${slug}-${timestamp}-package.jpg`);
    const inverterUrl = await uploadImage(inverterFile, `${slug}-${timestamp}-inverter.jpg`);
    const panelUrl = await uploadImage(panelFile, `${slug}-${timestamp}-panel.jpg`);

    if (packageUrl || inverterUrl || panelUrl) {
      console.log(`Updating database for ${slug}...`);
      const updateData = {};
      if (packageUrl) updateData.package_image = packageUrl;
      if (inverterUrl) updateData.inverter_image = inverterUrl;
      if (panelUrl) updateData.panel_image = panelUrl;

      const { error } = await supabase
        .from('solar_packages')
        .update(updateData)
        .eq('slug', slug);

      if (error) {
        console.error(`Failed to update DB for ${slug}:`, error.message);
      } else {
        console.log(`Successfully updated ${slug}`);
      }
    }
  }
  
  console.log('Migration complete!');
}

runMigration().catch(console.error);
