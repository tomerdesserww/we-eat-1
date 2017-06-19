class ReviewsController < ApplicationController
  def index
    render json: Restaurant.find(review_params[:restaurant_id]).reviews
  end

  def create
    render json: Restaurant::Review.create!(review_params), status: :created
  end

  private

  def review_params
    params.permit(:restaurant_id, :reviewer_name, :body, :rating)
  end
end
