class RestaurantsController < ApplicationController
  def index
    render json: Restaurant.all
  end

  def show
    render json: Restaurant.find(params.require(:id))
  end

  def create
    render json: Restaurant.create!(restaurant_params), status: :created
  end

  def update
    @restaurant = Restaurant.find(params.require(:id))
    @restaurant.update!(restaurant_params)

    render json: @restaurant, status: :ok
  end

  def destroy
    @restaurant = Restaurant.find(params.require(:id))
    @restaurant.destroy!

    head :ok
  end

  private

  def restaurant_params
    params.permit(:name, :cuisine_id, :address, :rating, :accepts_10bis, :max_delivery_time_minutes)
  end
end
