# frozen_string_literal: true

module Chesster
  class ChessboardComponent < ViewComponent::Base
    def initialize(fen:, draggable: true)
      @fen = fen
      @draggable = draggable
    end
  end
end