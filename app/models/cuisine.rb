# == Schema Information
#
# Table name: cuisines
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#

class Cuisine < ApplicationRecord
  validates :name, presence: true
end
