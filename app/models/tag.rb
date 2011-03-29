class Tag < ActiveRecord::Base
    # there is a one-to-many mapping between an image and tags
    belongs_to :image

    # Text content of tag  has max 50 chars and min 1
    validates :content, :presence => true, :length => {:maximum => 50 }
    
    #validate x position, TODO [>=0 and within the xbounds]
    validates_numericality_of :xpos, :only_integer => true
    
    # same for y
    validates_numericality_of :ypos, :only_integer => true
    
    # validate image ID
    validates :image_id, :presence => true
    validates_numericality_of :image_id, :only_integer => true
end
