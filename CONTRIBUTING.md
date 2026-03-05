# Contributing to Yamaha Controller

First off, thank you for considering contributing to the Yamaha Controller project! It's people like you that make this tool better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing code style
5. Issue that pull request!

## Development Process

1. Clone the repository
   ```bash
   git clone https://github.com/pepperonas/yahama-controller.git
   cd yahama-controller
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Make your changes and test them
   ```bash
   npm start
   ```

5. Commit your changes
   ```bash
   git add .
   git commit -m "Add your descriptive commit message"
   ```

6. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

7. Open a Pull Request

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

* Use 2 spaces for indentation
* Use semicolons
* Use single quotes for strings
* Add trailing commas in multi-line objects and arrays
* Follow ES6+ conventions where appropriate

### Documentation Styleguide

* Use Markdown for documentation
* Reference functions and classes in backticks: \`functionName()\`
* Include code examples where helpful

## Testing

Before submitting a pull request, please ensure:

1. The application starts without errors
2. All existing functionality still works
3. Your changes work on different browsers
4. The receiver communication is not broken

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

Thank you for your contribution!