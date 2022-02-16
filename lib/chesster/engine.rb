module Chesster
  class Engine < ::Rails::Engine
    isolate_namespace Chesster

    initializer "chesster.importmap", before: "importmap" do |app|
      app.config.importmap.paths << Engine.root.join("config/importmap.rb")
    end
  end
end
