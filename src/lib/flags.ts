// Single on/off switch for the customer-facing AI assistants (the corner
// chat widget and the "Talk With Us" voice button in the homepage hero).
//
// false = built into the site but not rendered for visitors (safe to deploy
//         to production without exposing them)
// true  = live for real visitors
//
// Flip to true only when Julie has signed off on going live. Preview deploys
// can be built with this temporarily true to test, then set back to false.
export const ASSISTANTS_LIVE = false;
