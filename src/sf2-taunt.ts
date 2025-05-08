import {
  createCanvas,
  loadImage,
  registerFont,
  CanvasRenderingContext2D,
} from "canvas";
import * as fs from "fs";
import * as path from "path";

const __dirname = path.resolve();

const TAUNTS = [
  "TomYore clearly isn't training you properly, is he?",
  "Your reflexes are atrocious - a disgrace to the sport!",
  "Don't you realize how utterly pathetic you are?",
  "Seriously, was that the best you could do? Shameful!",
  "TomYore wouldn’t even let me train with you.",
  "You're an embarrassment to anyone who appreciates skill.",
  "I've faced tougher opponents in a bubble bath!",
  "Don't expect any sympathy – you earned this defeat.",
  "TomYore should be ashamed of associating with someone like you.",
  "You couldn't beat a robot, let alone me!",
  "TomYore's training methods are clearly a disaster!",
  "You're a disgrace to the entire game, honestly.",
  "Don't you even know how to control a ball?",
  "I’ve had more strategic depth in my coffee break.",
  "TomYore must be mortified watching you play.",
  "Seriously? That's the best you could manage?",
  "I could teach a stone to play better than you.",
  "You’re an insult to competitive foosball, truly.",
  "TomYore's standards are far higher, I assure you.",
  "My grandmother plays with more finesse than you.",
  "You dare challenge me?! Get out of my sight!",
  "Your pathetic attempts at strategy are an insult!",
  "I’ll crush you like a bug beneath my foot!",
  "Don’t expect mercy from a true champion!",
  "TomYore should be ashamed to associate with someone so weak!",
  "You’re a disgrace to the sport – a complete embarrassment!",
  "Prepare to be annihilated – you're finished!",
  "My dominance is absolute; your struggle is meaningless!",
  "You’re a stain on the game; I’ll erase you from existence!",
  "Begone, you incompetent fool – your loss is glorious!",
  "Investing in cryptocurrency is more strategic than your play.",
  "Your footwork is as volatile as a bad crypto trade!",
  "I've seen more consistent returns in the blockchain market.",
  "Trading cryptocurrency is a serious business; you’re clearly delusional.",
  "You're holding onto that ball like you're holding onto a failing crypto!",
  "Seriously, you think you’re mastering foosball?  It's digital assets, not spreadsheets.",
  "I'm predicting your career will crash like a Bitcoin plummet!",
  "You’re as predictable as a fluctuating crypto market—utterly useless!",
  "Don't tell me you're investing in NFTs too? That's just insane!",
  "Your game is worthless.  Just like Dogecoin - good riddance!",
  "Trading on decentralized exchanges is *far* more efficient than your footwork!",
  "You're moving the ball around like a poorly-liquidated DeFi asset.",
  "At least a smart contract has some predictive value – you clearly don’t.",
  "Investing in stablecoins is a more reliable strategy than your ball control!",
  "Your game is like a failed DAO - quickly dissolving into chaos.",
  "Don't tell me you’re a DeFi guru too? You're a complete novice!",
  "You’re moving the ball around like a Ponzi scheme – unsustainable and doomed.",
  "Seriously, you think you're building an empire with foosball?  Get real!",
  "Your game is as transparent as a black swan – unpredictable and shocking.",
  "You’re moving the ball around like a rug pull – vanishing without a trace!",
  "You've single-handedly destroyed the production environment!",
  "That was a catastrophic system failure, frankly.",
  "Did you even *consider* the impact on the operational framework?",
  "You’ve effectively dismantled the entire production process!",
  "This isn’t a game; you’ve just corrupted the system!",
  "Your performance has triggered a full system reboot!",
  "You've created a production environment meltdown!",
  "I’m initiating a complete rollback – your loss is absolute!",
  "You’ve compromised the entire manufacturing process!",
  "Consider this a system-level diagnostic – and the verdict is: failure!",
];

async function createTauntScreen() {
  // Register custom font
  const fontPath = path.join(__dirname, "./assets/font.ttf");
  registerFont(fontPath, { family: "SF2Font" });

  // Define dimensions and layout
  const canvasWidth = 800;
  const canvasHeight = 600;
  const imageWidth = 300;
  const imageHeight = 350;
  const padding = 50;

  // Create canvas
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  // Set background color (black)
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  try {
    // Load fighter images
    const winnerImage = await loadImage(
      path.join(__dirname, "./assets/caity-test.jpg"),
    );
    const loserImage = await loadImage(
      path.join(__dirname, "./assets/paul-test.jpg"),
    );

    // Draw fighter images
    // Ryu on the left
    ctx.drawImage(winnerImage, padding, padding, imageWidth, imageHeight);

    // Ken on the right
    ctx.save();
    ctx.translate(canvasWidth - padding, padding); // Move the context to the right edge
    ctx.scale(-1, 1); // Flip the context horizontally
    ctx.drawImage(loserImage, 0, 0, imageWidth, imageHeight);
    ctx.restore();

    // Add text below images
    ctx.font = "28px SF2Font";
    ctx.fillStyle = "#FFFFFF"; // SF2 yellow color
    ctx.textAlign = "center";

    // Draw wrapped text
    const maxWidth = canvasWidth - 100; // Leave some margin on both sides
    const lineHeight = 34; // Slightly more than font size
    wrapText(
      ctx,
      TAUNTS[Math.floor(Math.random() * TAUNTS.length)],
      canvasWidth / 2,
      canvasHeight - 150,
      maxWidth,
      lineHeight,
    );

    // Save the output image
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.join(__dirname, "../sf2-taunt-output.png"), buffer);

    console.log("Taunt screen created successfully at sf2-taunt-output.png");
  } catch (error) {
    console.error("Error creating taunt screen:", error);
  }
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }

  lines.push(line);

  // Center align all lines
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, y + i * lineHeight);
  }
}

// Run the function
createTauntScreen();
