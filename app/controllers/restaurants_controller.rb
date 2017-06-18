class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all

    render json: @restaurants
  end

  def show
    @restaurant = Restaurant.find(params.require(:id))

    render json: @restaurant
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)

    if @restaurant.save
      render json: @restaurant, status: :created
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
  end

  def update
    @restaurant = Restaurant.find(params.require(:id))

    if @restaurant.update(restaurant_params)
      render json: @restaurant, status: :ok
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
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
