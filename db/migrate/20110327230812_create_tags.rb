class CreateTags < ActiveRecord::Migration
  def self.up
    create_table :tags do |t|
      t.string :content
      t.integer :xpos
      t.integer :ypos
      t.integer :image_id

      t.timestamps
    end
  end

  def self.down
    drop_table :tags
  end
end
