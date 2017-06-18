Rails.application.routes.draw do
  resources :cuisines
  resources :restaurants do
    resources :reviews, only: [:index, :create]
  end

  get '/', to: 'application#index'
end
