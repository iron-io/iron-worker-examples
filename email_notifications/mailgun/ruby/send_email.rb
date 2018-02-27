require_relative 'bundle/bundler/setup'
require 'iron_worker'
require 'mailgun'

# First, instantiate the Mailgun Client with your API key
mg_client = Mailgun::Client.new ENV['MAILGUN_API_KEY']

# Define your message parameters
message_params = {:from    => IronWorker.payload['from'],
                  :to      => IronWorker.payload['to'],
                  :subject => IronWorker.payload['subject'],
                  :text    => IronWorker.payload['body']}

# Send your message through the client
response = mg_client.send_message IronWorker.payload['domain'], message_params

puts response.body.to_s