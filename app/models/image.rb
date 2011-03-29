class Image < ActiveRecord::Base
    # there is a one-to-many mapping between an image and tags
    # an image's tags are destroyed along with the image
    has_many :tags, :dependent => :destroy

    # validate URL, from:
    # http://intridea.com/2009/2/18/quick-tip-url-validation-in-rails
    validates_format_of :url, :with => URI::regexp(%w(http https))
end
