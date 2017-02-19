var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    var uriParts = {
        scheme: '',
        authority: '',
        path: '',
        query: '',
        fragment: ''
    };

    var parts = uri.split("");
    var str = "";
    var sFlag = 0, aFlag = 0, pFlag = 0;

    for (var i = 0; i < parts.length; i++){
        str = str + parts[i];
        if (sFlag == 0 && (str.includes("://"))){
            str = str.replace("://", "");  
            uriParts['scheme'] = str;
            sFlag = 1;
            str = "";
        }else if (aFlag == 0 && ((str.includes("/") && uriParts['scheme'] != "") || (i == parts.length-1 && str != ""))){
            str = str.replace("/", "");
            uriParts['authority'] = str;
            aFlag = 1;
            str = "/"; 
        }else if (pFlag == 0 && ((str.includes("?") || str.includes ("#")) || (i == parts.length-1 && str != ""))){
            if(str.includes("?")) {
                str = str.replace("?", "");
                uriParts['path'] = str; 
                str = "?";
            }else if(str.includes("#")) {
                str = str.replace("#", "");
                uriParts['path'] = str;
                str = "#";
            }else{
                uriParts['path'] = str;
            }
            pFlag = 1;
        }else if (str.includes("?")){
            if (str.includes("#")){
                str = str.replace("?", "");
                str = str.replace("#", "");
                uriParts['query'] = str;
                str = "#";
            }else if (i == parts.length-1){
                str = str.replace("?", "");
                uriParts['query'] = str;
                str = ""
            }
        }else if (i == parts.length-1){
            if (str.includes("#")){
                str = str.replace("#","");
                uriParts['fragment'] = str;
            }
        }
    }
    return uriParts;
}