# Contributing to Valthera Web App

## Development Rules

- Use TypeScript strictly.
- Keep components small and composable.
- Keep wallet logic isolated from presentation components.
- Never hardcode production contract addresses without configuration.
- Use environment variables only for public frontend-safe values.

## PR Requirements

Every UI PR should include:

- What changed
- Screenshots if UI changed
- How to test locally
- Wallet/network behavior affected
- Security considerations

## Security Requirements

- No private keys or secrets.
- No unaudited transaction construction shortcuts.
- No hidden transaction signing.
- No AI-generated transaction without user review and confirmation.
