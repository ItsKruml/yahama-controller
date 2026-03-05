# Changelog

All notable changes to the Yamaha Controller project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- English documentation and internationalization support
- Multiple badges for project status and technology stack
- Donation/sponsorship buttons for project support
- Comprehensive contributing guidelines
- Issue templates for bugs and feature requests
- Improved repository structure with organized directories
- Docker deployment support documentation
- API documentation section
- Development setup instructions

### Changed
- README completely rewritten in English with modern formatting
- Repository structure reorganized for better maintainability
- Enhanced technical documentation

## [1.2.1] - 2025-09-01

### Fixed
- Power Toggle Bugfix - Removed deprecated `checkIfLocked()` calls
- Increased stability - Power button now works without JavaScript errors

## [1.2.0] - 2025-08-01

### Added
- Auto-connect enabled - Automatic connection on page load with saved IP
- Enhanced error handling - Detailed error messages and null-pointer protection
- Improved stability - Robust connection logic with error handling

### Changed
- Unlock mechanism completely removed - App works without authentication
- UI optimization - Audio Enhancement moved as second section in basic controls
- Volume Buttons Fix - +/- volume buttons now work correctly

### Removed
- All authentication barriers - All control functions directly accessible

## [1.1.0] - 2025-07-01

### Added
- PWA functionality with correct app icons
- Dual theme support (Dark/Light Mode)
- Responsive design improvements
- Extended audio features

## [1.0.0] - 2025-01-01

### Added
- Initial release
- Basic receiver control functionality
- Multi-zone support
- DSP programs
- 7-band equalizer
- Scene presets
- System information display
- Real-time status polling
- Connection management
- PM2 deployment support

## Previous Versions

For versions before 1.0.0, please refer to the git history.