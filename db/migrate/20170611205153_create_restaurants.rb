class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.references :cuisine, null: false, foreign_key: true
      t.float :rating
      t.boolean :accepts_10bis
      t.string :address
      t.integer :max_delivery_time_minutes

      t.timestamps
    end
  end
end
