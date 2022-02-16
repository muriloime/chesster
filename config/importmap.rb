
pin "application", to: "chesster/application.js", preload: true

pin_all_from Chesster::Engine.root.join("app/assets/javascripts/chesster/controllers"), under: "controllers", to: "chesster/controllers"
