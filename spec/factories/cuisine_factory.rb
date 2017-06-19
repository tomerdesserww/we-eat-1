FactoryGirl.define do
  factory :cuisine do
    name { %w(Italian Israeli French American).sample }
  end
end
