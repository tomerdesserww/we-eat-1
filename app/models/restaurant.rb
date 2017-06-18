# == Schema Information
#
# Table name: restaurants
#
#  id                        :uuid             not null, primary key
#  name                      :string           not null
#  cuisine_id                :integer          not null
#  rating                    :integer          not null
#  accepts_10bis             :boolean          not null
#  address                   :string           not null
#  max_delivery_time_minutes :integer          not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null

class Restaurant < ApplicationRecord
  belongs_to :cuisine, optional: false
  has_many :reviews

  validates :name, :rating, :address, :max_delivery_time_minutes, presence: true
  validates :accepts_10bis, inclusion: { in: [ true, false ] }
end
