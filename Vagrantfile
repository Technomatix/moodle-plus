# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.8.7"

Vagrant.configure("2") do |config|
    config.vm.define "Moodle-Plus" do |foo|
    end

    # base box
    config.vm.box = "ubuntu/trusty64"

    # virtualbox
    config.vm.provider "virtualbox" do |v|
        v.memory = 2048
        v.cpus = 2
    end

    # static IP
    config.vm.network "private_network", ip: "10.0.0.10"

    # synced folder
    config.vm.synced_folder ".", "/vagrant",
        owner: "vagrant",
        group: "www-data",
        mount_options: ["dmode=775,fmode=764"]

    # provisioned files
    config.vm.provision "file", source: "vagrant/bash_aliases", destination: ".bash_aliases"
    config.vm.provision "file", source: "vagrant/vimrc", destination: ".vimrc"
    config.vm.provision "file", source: "vagrant/inputrc", destination: ".inputrc"
    config.vm.provision "file", source: "vagrant/pgpass", destination: ".pgpass"

    # provisioning script
    config.vm.provision :ansible_local do |ansible|
        ansible.provisioning_path = "/vagrant/vagrant"
        ansible.playbook = "playbook.yml"
        ansible.limit = "all"
    end

    # post-up message
    config.vm.post_up_message = "Moodle is now available at http://10.0.0.10\nPlease login with username 'admin' and password 'Wibble123!'"
end
