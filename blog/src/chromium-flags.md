---
title: Chromium Flags
created: 2016-01-20
tags:
  - chrome
  - chromium
  - browser
  - command-line
  - cli
  - flags
---

Chromium can take a ridiculous amount of flags (when launched on the command
line).

Full reference (kept updated) available
[here](http://peter.sh/experiments/chromium-command-line-switches/).

This is just the ones I picked out that I thought might be useful.

--------

* --allow-external-pages (during layout tests)
* --allow-file-access-from-files (file:/// can't access file:///, by default)
* --allow-outdated-plugins
* --allow-running-insecure-content
* --allow-sandbox-debugging
* --always-authorize-plugins
* --app specifies that value be launched in 'application' mode
* --content-shell-host-window-size (like "800x600")
* --data-path (use this path for the data directory)
* --debug-packed-apps
* --diagnostics (a whole slew of diagnostic modes)
* --dispable-dinosaur-easter-egg (the offline animation thing)
* --disable-download-notification
* --disable-file-system (api)
* --disable-infobars
* --disable-icon-ntp
* --disable-local-storage
* --disable-logging
* --disable-low-end-device-mode
* --disable-md-downloads (the material design chrome://downloads)
* --disable-new-bookmark-apps
* --disable-new-channel-switcher
* --disable-new-kiosk-ui
* --disable-new-profile-management
* --disable-new-task-manager
* --disable-new-zip-unpacker (which is based on the filesystem provider api)
* --disable-notifications
* --disable-ntp-favicons
* --disable-ntp-popular-sites
* --disable-offline-auto-reload
* --disable-offline-pages
* --disable-overlay-scrollbar (doesn't work on mac)
* --disable-password-generation
* --disable-permissions-blacklist
* --disable-plugins-discovery
* --disable-popup-blocking
* --disable-print-preview
* --disable-prompt-on-repost
* --disable-pull-to-refresh-effect
* --disable-save-password-bubble
* --disable-session-crashed-bubble
* --disable-settings-window
* --disable-single-click-autofill
* --disable-site-allocation-service
* --disable-smart-virtual-keyboard
* --disable-sync
* --disable-tab-switcher
* --disable-translate
* --disabble-usb-keyboard-detect (for when win8 blocks the on-screen keyboard)
* --disable-voice-input
* --disable-web-security (same-origin policy)
* --disable-webaudio
* --disable-xss-auditor
* --disabled (touch events)
* --disk-cache-dir
* --disk-cache-size
* --dump-browser-histograms
* --enable-experimental-app-list (implies --enable-centered-app-list)
* --enable-experimental-canvas-features
* --enable-experimental-extension-apis
* --enable-experimental-input-view-features
* --enable-experimental-web-platform-features
* --enable-hosted-app-quit-notification
* --enable-md-downloads
* --enable-md-policy-page
* --enable-md-history
* --enable-md-extensions
* --enable-memory-benchmarking
* --enable-media-suspend (on background tabs)
* --enable-net-benchmarking
* --enable-network-information
* --enable-new-app-list-mixer
* --enable-new-bookmark-apps
* --enable-override-bookmarks-ui
* --enable-panels
* --enable-power-overlay (in settings)
* --enable-potentially-annoying-security-features
* --enable-query-extraction (in the omnibox)
* --enable-reader-mode-toolbar-icon
* --enable-tab-audio-muting
* --enable-tab-switcher-in-document-mode
* --enable-viewport (the css rule)
* --enable-web-app-frame
* --enable-web-bluetooth
* --enable-web-notification-custom-layouts
* --enable-webvr
* --enabled (all touch events, always)
* --error-console collects runtime and manifest errors, displays in chrome://extensions
* --extensions-on-chrome-urls
* --extensions-not-webstore (comma separated list of their ids)
* --extra-search-query-params (to be inserted in search and instant URLs)
* --fast (faster material design animations)
* --force-app-mode hides some ui elements
* --force-dev-mode-hightlighting
* --force-device-scale-factor
* --full-memory-crash-report (dump)
* --homepage
* --homedir
* --incognito
* --install-chrome-app
* --javascript-harmony (enables es6 shiz)
* --kiosk
* --load-and-launch-app (from specified directory)
* --load-extension
* --load-plugin
* --make-default-browser
* --material (kTopChromeMD)
* --media-cache-size (in bytes)
* --media-recording-only (disables reporting)
* --mute-audio
* --new-profile-management
* --new-window (launches URL in one)
* --NewProfileManagement (?)
* --no-default-browser-check
* --no-displaying-insecure-content
* --no-experiments
* --no-referrers
* --no-startup-window (when running background apps)
* --pack-extension (crx from given dir)
* --process-per-site
* --process-per-tab
* --profile-directory
* --prompt-for-external-extensions (prompt user before allowing their installation?)
* --remote-debugging-port
* --remote-debugging-targets (<host>:<port>...<host>:<port>>)
* --renderer (instead of running as browser)
* --restore-last-session
* --restrict-iframe-permissions (all iframes, all permissions)
* --rtl
* --save-page-as-mhtml (no longer any html-only or html-complete)
* --scripts-require-action (requires user consent for extensions running scripts)
* --scroll-end-effect (vertical overscroll). 0 is default (disabled); 1 to enable.
* --show-app-list
* --show-saved-copy (when offline) disabled, primary, or secondary (refers to button placement)
* --show_summary (below update menu item)
* --silent-launch (no windows)
* --silent-debugger-extension-api (no infobar on chrome.debugger page; needed for extension background pages)
* --single-process
* --slow (material design animations)
* --site-per-process (one site per process)
* --start-fullscreen
* --start-maximized
* --system-developer-mode (system in dev mode; probing done by session manager)
* --top-chrome-md (enables md elements)
* --top-controls-hide-threshold (percentage)
* --top-controls-show-threshold
* --touch-events (enable support for)
* --try-chrome-again (lol, dialog asking user to try chrome, again....)
* --uninstall
* --unlimited-storage (for any apps/origins)
* --unsafely-treat-insecure-origin-as-secure (also needs --user-data-dir specified)
* --use-fake-device-for-media-stream
* --use-fake-ui-for-media-stream
* --use-file-for-fake-audio-capture (wav)
* --use-file-for-fake-video-capture (y4m)
* --use-mobile-user-agent
* --use-simple-cache-backend (experimental cache backend, if possible)
* --use-temporary-user-data-dir
* --user-agent
* --user-data-dir
* --validate-crx examines a crx, prints results
* --validate-input-event-stream
* --wait-for-debugger (for 60 seconds, to attach to the process)
* --warp (?)
* --watcher (runs as watcher process)
* --window-position (=x,y)
* --window-size (=w,h)
