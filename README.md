# MATRIX-ZYGISK

**MR MATRIX ZYGISK --- Independent Android Systems WebUI Prototype**

MATRIX-ZYGISK is an independent project exploring a custom,
mobile-friendly management interface for Android Zygisk-related
workflows. The current repository contains a static WebUI prototype,
basic client-side interactions, GitHub Actions checks, and a GitHub
Pages deployment workflow.

> \[!IMPORTANT\] **Current status: WebUI prototype only.** The interface
> is not connected to an Android device or a live Zygisk Next runtime.
> Its switches and selectors are demonstration controls: they do not
> change Android settings, inject code, configure root, or persist
> settings.

-   **Repository:** https://github.com/mdshovon97/MATRIX-ZYGISK
-   **Live prototype:** https://mdshovon97.github.io/MATRIX-ZYGISK/
-   **Upstream project:** https://github.com/LSPosed/ZygiskNext
-   **Upstream releases:**
    https://github.com/LSPosed/ZygiskNext/releases

------------------------------------------------------------------------

## Contents

-   [Project status](#project-status)
-   [Current interface](#current-interface)
-   [What works today](#what-works-today)
-   [What is not implemented](#what-is-not-implemented)
-   [Repository structure](#repository-structure)
-   [Run locally](#run-locally)
-   [Development and validation](#development-and-validation)
-   [GitHub Actions and Pages](#github-actions-and-pages)
-   [Upstream relationship and
    restrictions](#upstream-relationship-and-restrictions)
-   [Security and privacy](#security-and-privacy)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [License and attribution](#license-and-attribution)

## Project status

  ---------------------------------------------------------------------
  Area                               Current status
  ---------------------------------- ----------------------------------
  Responsive HTML interface          Implemented

  Dark MR MATRIX visual theme        Implemented

  Expandable management panels       Implemented

  Local demonstration controls and   Implemented
  notice                             

  Required-file and JavaScript       Implemented in GitHub Actions
  syntax checks                      

  GitHub Pages deployment workflow   Configured

  Android device connection          Not implemented

  Live runtime telemetry or          Not implemented
  configuration                      

  Device compatibility testing       Not completed

  Upstream update automation         Not implemented

  Android installation/release       Not provided
  package                            

  Project-wide license decision      Not finalized
  ---------------------------------------------------------------------

A successful website build or CI run does **not** establish Android
compatibility or runtime functionality.

## Current interface

The `webui/` directory contains the static interface:

-   **Runtime status:** displays disconnected/unknown values rather than
    fabricated live telemetry.
-   **Runtime settings:** demonstrates a denylist policy selector and
    switches for non-root-app handling, anonymous memory, the Zygisk
    Next linker, and developer logging.
-   **Zygote monitoring:** shows placeholder process and injection
    status.
-   **Diagnostics:** illustrates where module inventory, issue status,
    root environment, and bugreport availability could appear.
-   **Updates and integrity:** links to official upstream releases and
    describes a manual release/changelog/checksum review process.
-   **Integration readiness:** distinguishes completed interface work
    from runtime integration and device validation that remain pending.

These panels are **design prototypes**, not implementations of the
underlying Android features. Demo-control values are not saved and do
not send commands to a device.

## What works today

-   Static HTML, CSS, and JavaScript served by GitHub Pages.
-   Responsive dark interface with crimson MR MATRIX accents.
-   Expand/collapse behavior for management panels.
-   A temporary notice when a demo control is changed.
-   Basic automated checks for required files, JavaScript syntax, remote
    script imports, and disconnected-runtime labels.
-   A GitHub Actions workflow that deploys the contents of `webui/` to
    GitHub Pages from `main`.

## What is not implemented

The current prototype does **not**:

-   connect to Android, ADB, KernelSU, Magisk, ReSukiSU, or Zygisk Next;
-   read or modify root-manager settings or denylist policies;
-   enable or disable Zygisk Next features;
-   inject modules or monitor actual Zygote processes;
-   enumerate installed modules or diagnose a live device;
-   create or export a real runtime bugreport;
-   download, patch, repackage, or install upstream binaries;
-   automatically sync upstream changes; or
-   produce a flashable ZIP, APK, or other Android installation package.

Do not rely on the prototype for device administration, security
decisions, compatibility claims, or recovery procedures.

## Repository structure

``` text
MATRIX-ZYGISK/
├── .github/
│   └── workflows/
│       ├── static.yml          # GitHub Pages deployment
│       └── ui-checks.yml       # Static WebUI checks
├── webui/
│   ├── index.html              # Interface structure and content
│   ├── styles.css              # Theme, layout, responsive styling
│   └── app.js                  # Local-only interface interactions
└── README.md
```

## Run locally

The prototype has no build step or package installation requirement.
From the repository root, run:

``` bash
python -m http.server 8000 --directory webui
```

Then open `http://localhost:8000` in your browser. You can also open
`webui/index.html` directly, although a local HTTP server more closely
resembles GitHub Pages.

No Node dependencies are required by the current application; Node is
used in CI to check JavaScript syntax.

## Development and validation

The `Matrix UI checks` workflow runs when files under `webui/` or the
workflow itself change, on pull requests touching those paths, and when
manually dispatched.

It currently checks:

1.  Required WebUI files exist and are non-empty.
2.  Required prototype/disconnected-runtime wording is present.
3.  `webui/app.js` passes `node --check`.
4.  `webui/index.html` does not include an HTTP(S) remote script import.
5.  The UI retains explicit `Not connected` and `UI PROTOTYPE` labels.

These are lightweight static checks. They do not test browser rendering,
screen-reader behavior, Android runtime behavior, device compatibility,
or release packaging.

### Manual test checklist

Before merging a UI change, check the following on a narrow mobile
viewport and a desktop browser:

-   [ ] The page loads with no missing CSS or JavaScript.
-   [ ] All four management panels open and close correctly.
-   [ ] Switches and the policy selector show the demo notice.
-   [ ] The interface remains readable at small widths and high zoom.
-   [ ] Keyboard focus is visible and controls have accessible labels.
-   [ ] Disconnected/unknown states remain explicit.
-   [ ] No text implies a real device connection or successful runtime
    action.
-   [ ] GitHub Actions checks pass.
-   [ ] The GitHub Pages deployment completes successfully.

## GitHub Actions and Pages

Two workflows are configured:

-   **`.github/workflows/ui-checks.yml`** --- validates basic WebUI file
    requirements and JavaScript syntax.
-   **`.github/workflows/static.yml`** --- deploys the `webui/`
    directory to GitHub Pages from the `main` branch.

Live site: https://mdshovon97.github.io/MATRIX-ZYGISK/

If a workflow fails, open the failed job in **GitHub → Actions**, expand
the first failed step, and use its log output to identify the exact
check. Do not assume deployment succeeded merely because the UI-check
workflow passed; inspect the Pages deployment workflow separately.

## Upstream relationship and restrictions

MATRIX-ZYGISK is an independent interface project. Zygisk Next is a
separate upstream project:

-   Source: https://github.com/LSPosed/ZygiskNext
-   Releases: https://github.com/LSPosed/ZygiskNext/releases

The long-term goal is to track upstream releases, review release notes
and published checksums, and evaluate compatibility before any permitted
integration. **Automated synchronization is not implemented.** A link to
upstream releases is not an update mechanism.

The upstream repository's current copyright notice states that versions
starting with v4-0.9.2 are all rights reserved and restrict
modification, redistribution, extraction of components, and claims of
succession. Review the upstream notice directly before planning any
integration or distribution. Do not copy upstream binaries, compiled
WebUI assets, or source components into this repository, rename or
repackage them, or imply that MATRIX-ZYGISK is an official or successor
project without explicit authorization.

Any future integration plan must be reviewed for permission, licensing,
security, architecture, and compatibility before implementation. Until
then, this repository remains a separate UI prototype.

## Security and privacy

-   Treat runtime, process, root, module, and compatibility values as
    unavailable unless a real, tested integration supplies them.
-   Never display demo values as live device data.
-   Do not collect or upload device information without a clear purpose,
    consent, and appropriate safeguards.
-   Diagnostic logs may contain identifiers, paths, package names, or
    other sensitive information. Review and redact logs before sharing.
-   Do not expose root privileges or execute privileged operations from
    an untrusted web page.
-   Keep credentials, signing keys, access tokens, and private device
    data out of source control.
-   Review third-party actions and dependencies before expanding CI
    workflows.

## Roadmap

The following is a proposed sequence, not a claim that these features
are already available.

### Phase 1 --- Stabilize the WebUI

-   [x] Initial HTML interface
-   [x] MR MATRIX dark theme
-   [x] Expandable panel interactions
-   [x] Basic GitHub Actions checks
-   [x] GitHub Pages deployment workflow
-   [ ] Cross-browser and mobile layout testing
-   [ ] Accessibility review and refinements

### Phase 2 --- Document architecture and boundaries

-   [ ] Define a reviewed architecture for any future device-side
    component
-   [ ] Specify data contracts and explicit disconnected/error states
-   [ ] Document threat model, permissions, and failure/recovery
    behavior
-   [ ] Decide the project license for original code

### Phase 3 --- Upstream release review

-   [ ] Document a manual release-review checklist
-   [ ] Record version, release notes, and trusted checksum source when
    reviewing a release
-   [ ] Assess compatibility and permission before any integration
-   [ ] Add automation only where it respects upstream restrictions and
    is tested

### Phase 4 --- Authorized integration and device testing

-   [ ] Confirm the proposed integration and distribution are permitted
-   [ ] Implement a least-privilege interface only after architecture
    and security review
-   [ ] Test on explicitly documented Android versions, root
    implementations, and devices
-   [ ] Add integration tests, failure handling, and recovery
    documentation
-   [ ] Publish a release only after validation and licensing review

## Contributing

Contributions to the independent WebUI and documentation are welcome.

1.  Open an issue describing the change or problem.
2.  Keep UI code, documentation, and any future privileged component
    clearly separated.
3.  Avoid claims that a feature works on Android unless it has been
    implemented and tested.
4.  Test mobile and desktop layouts and run the GitHub Actions checks.
5.  Include screenshots for significant visual changes, making sure they
    do not reveal private device information.
6.  Do not submit restricted upstream source, binaries, or compiled
    assets without explicit permission.

For substantial architecture or runtime changes, discuss the proposal
before implementation.

## License and attribution

The license for original MATRIX-ZYGISK contributions has **not yet been
finalized**. Until a license is selected and added to the repository, do
not assume that the project is offered under an open-source license or
that reuse is automatically permitted.

Zygisk Next is a separate project with its own copyright and usage
restrictions. Any future use must comply with applicable upstream terms
and required permissions. This README does not grant permission to copy,
modify, redistribute, or repackage upstream materials.

## Project identity

**MR MATRIX \| MATRIX-ZYGISK**\
Independent Android systems interface development.

This project is not an official Zygisk Next release and does not claim
to be its successor.
