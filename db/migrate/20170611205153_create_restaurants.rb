class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.references :cuisine, null: false, foreign_key: true
      t.float :rating, null: false
      t.boolean :accepts_10bis, null: false
      t.string :address, null: false
      t.integer :max_delivery_time_minutes, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.timestamps
    end
  end
end
