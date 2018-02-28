require_relative 'bundle/bundler/setup'
require 'github_api'
require 'iron_worker'

owner = IronWorker.config["owner"]
repo = IronWorker.config["repo"]
path = IronWorker.config["path"]

github = Github.new
res = github.repos.contents.get owner, repo, path

decode_base64_content = Base64.decode64(res.content)
File.open("run.rb", "wb") do |file|
  file.write(decode_base64_content)
  file.close
end

require "./run.rb"
