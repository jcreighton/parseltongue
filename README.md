Hello! Thanks for reviewing this project! I chose to do a Harry Potter-themed game since I'm unfamiliar with the original game and also, hello, I am a nerd.

Run:
- `npm install http-server -g`
- `http-server` to start
- visit localhost:8080

Some improvements I didn't get to:
- UI is basic, I chose to focus on the game functionality instead of the UI
- No start screen

Noted issues:
- Multiple files not bundled and minified (based on the instructions, this was not needed but wanted to note I'm aware it would be best practice)
- The code for placing "food" without collision is inefficient as it will take more time to find non-collision coordinates at the snake grows
- Due to the use of setTimeout, the user can update the state multiple times in a row _at a greater rate than the loop can draw_. If the setTimeout is sufficiently fast, this is less problematic. I've used generator functions before to [resolve async issues with a Tamagotchi game](https://youtu.be/GTzwCqoVOPc) and I might have figured out an approach using generators here.