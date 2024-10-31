# Unkey Next.js 15 Monorepo RateLimiting Template

This monorepo uses the Next.js 15 framework with Unkey API integration, managed as a monorepo with TurboRepo.

## Getting Started

To use this template:

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/thefool76/Unkey-Nextjs-15-Mono-repo-ratelimiting-template.git
   cd Unkey-Nextjs-15-Mono-repo-ratelimiting-template
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env.local` file in both the root and `apps/web` directories with the following contents:

   ```plaintext
   UNKEY_API_KEY=your_unkey_api_key
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Start the development server:**

   Run the development server to start working on your project:

   ```bash
   npm dev
   ```

   Your app should now be running at [http://localhost:3000](http://localhost:3000).


## Project Structure

This project is organized in a monorepo format using TurboRepo, which helps manage multiple packages and applications under a single repository. Below is an overview of the project structure:

```
.
├── apps/
│   ├── web/               # Next.js web application
│   └── docs/              # Documentation site
├── packages/
│   ├── ui/                # Shared UI components
│   ├── utils/             # Shared utilities
│   ├── api/               # API utilities and types
│   └── config/            # Shared configuration
├── package.json
├── turbo.json
└── README.md
```
## Scripts

- **`npm dev`**: Runs the development server.
- **`npm build`**: Builds the application for production.
- **`npm lint`**: Lints the codebase.

## License

This project is licensed under the MIT License.
"""


with open(file_path, 'w') as file:
    file.write(readme_content)

file_path
