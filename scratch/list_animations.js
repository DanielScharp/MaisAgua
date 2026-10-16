
import fs from 'fs';

function findAnimationNames(filePath) {
    const data = fs.readFileSync(filePath);
    // GLTF is JSON, GLB has JSON part.
    // We can try to find the "animations" array.
    const str = data.toString('utf8');
    const animMatch = str.match(/"animations":\s*\[/);
    if (!animMatch) {
       console.log("No animations found");
       return;
    }
    
    // Just find all "name" properties and hope they are animations if we start after "animations": [
    const section = str.substring(animMatch.index);
    const regex = /"name"\s*:\s*"([^"]+)"/g;
    let match;
    let count = 0;
    while ((match = regex.exec(section)) !== null && count < 100) {
        console.log(`${count}: ${match[1]}`);
        count++;
    }
}

findAnimationNames('public/glb/Farmer.glb');
