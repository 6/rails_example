module ApplicationHelper

    # returns a title on a per-page basis
    def title
        base_title = "Hello1000 Image Tagger"
        return base_title if @title.nil?
        "#{@title} | #{base_title}"
    end
    
end
