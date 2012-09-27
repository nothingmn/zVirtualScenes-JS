var credentials = function() {

    if (!(this instanceof credentials)) {
        return new credentials();
    } 
	
	this.Host = 'HOST';
	this.Port = 8030;
	this.Password = 'PASSWORD';
}
