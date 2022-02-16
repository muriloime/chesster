
pin "chess.js", to: "https://ga.jspm.io/npm:chess.js@0.12.1/chess.js"

pin "application", to: "chesster/application.js", preload: true

pin_all_from Chesster::Engine.root.join("app/assets/javascripts/chesster/controllers"), under: "controllers", to: "chesster/controllers"
