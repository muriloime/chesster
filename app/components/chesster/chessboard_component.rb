# frozen_string_literal: true

module Chesster
  class ChessboardComponent < ViewComponent::Base
    def initialize(fen:, 
                   draggable: true, 
                   white: true)
      @fen = fen
      @draggable = draggable
      @white = white
    end

    def orientation 
      @white ? 'white' : 'black' 
    end
  end
end