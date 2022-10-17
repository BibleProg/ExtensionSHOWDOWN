/**
* Credit: http://techslides.com/github-gist-api-with-curl-and-ajax
* https://developer.github.com/v3/gists/

* @example
* var g = new Gist();
* g.gistID = 'ae7f4db52bbf76051e25e26fb05712c0';
* g.token = '2590a460f653d23c4f61c6774b7a41296aea9028';
*
* g.create({
*    description: 'new gist',
*    public: true,
*    files: {
*        'file1.txt': {
*            'content': 'file contents'
*       }
*     }
* }, function(data) {
*        // callback
* });
*/

var Gist = function() {

    $.support.cors = true; // Whithout this ajax will not work in IE 9.
    $.ajaxSetup({ cache: false }); // Disable ajax cache globally.

    this.gistID = '';
    this.token = '';

    var self = this;

    this.newToken = function(user, pass, callback) {
        $.ajax({
            url: 'https://api.github.com/authorizations',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ':' + pass));
            },
            data: JSON.stringify({
                scopes: ['gist'],
                note: 'new token request from ajax ' + new Date()
            })
        }).always(function(data, txtStatus, err) {
            if (typeof callback === 'function') callback(data);
        });
    }

    this.create = function(data, callback) {
        $.ajax({
            url: 'https://api.github.com/gists',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'token ' + self.token);
            },
            data: JSON.stringify(data)
        }).always(function(data, txtStatus, err) {
            if (typeof callback === 'function') callback(data);
        });
    }

    this.edit = function(data, callback) {
        $.ajax({
            url: 'https://api.github.com/gists/' + self.gistID,
            type: 'PATCH',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'token ' + self.token);
            },
            data: JSON.stringify(data)
        }).always(function(data, txtStatus, err) {
            if (typeof callback === 'function') callback(data);
        });
    }
}