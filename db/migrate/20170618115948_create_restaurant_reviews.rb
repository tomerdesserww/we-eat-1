class CreateRestaurantReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurant_reviews do |t|
      t.references :restaurant
      t.string :reviewer_name
      t.string :body
      t.integer :rating

      t.timestamps
    end
  end
end
