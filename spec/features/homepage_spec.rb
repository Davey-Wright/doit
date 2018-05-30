require 'rails_helper'

RSpec.feature 'Click Button', type: :feature, js: true do
	scenario 'User clicks on the click me! button' do
		text = page.evaluate_script("$('h2').text()")
		expect(text).to eq('Shaka')
	end
end