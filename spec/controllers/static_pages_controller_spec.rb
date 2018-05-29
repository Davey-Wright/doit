require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do
	describe 'static_pages#index action' do
		it 'Should render static_pages/index' do
			get :index
			expect(response).to have_http_status(:success)
			expect(response).to render_template('static_pages/index')
		end
	end
end
