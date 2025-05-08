// This is a simple wrapper that will catch the canvas.node error
try {
  require('tsx/esm')('./sf2-taunt.ts');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('canvas.node')) {
    console.error('Canvas module error caught. Please install the required dependencies for canvas:');
    console.error('sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev');
    console.error('Then run: pnpm rebuild canvas');
    process.exit(1);
  } else {
    throw error;
  }
}