require_relative 'bundle/bundler/setup'
require 'net/http'
require 'json'
require 'iron_worker'

def makePostRequest(url)
  uri = URI(url)
  http = Net::HTTP.new(uri.host)
  request = Net::HTTP::Post.new(uri.request_uri)
  JSON.parse(http.request(request).body)
end

APP_KEY=ENV["APP_KEY"]
API_KEY=ENV["API_KEY"]
BASE_URL="https://api.ringcaptcha.com/#{APP_KEY}/sms"

phone=IronWorker.payload["phone"]
message=IronWorker.payload["message"]
full_url=BASE_URL+"?api_key=#{API_KEY}&phone=#{phone}&message=#{message}"
puts makePostRequest(full_url)