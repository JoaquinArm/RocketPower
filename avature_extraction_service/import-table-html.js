function importTableHtml (url) {

  let html = '<table' + UrlFetchApp.fetch(url).getContentText()
  let trs = [...html.matchAll(/<tr[\s\S\w]+?<\/tr>/g)];
  let data = [];

  for (let i=0;i<trs.length;i++){

    let tds = [...trs[i][0].matchAll(/<(td|th)[\s\S\w]+?<\/(td|th)>/g)];
    let prov = [];

    for (let j=0;j<tds.length;j++){

      donnee=tds[j][0].match(/(?<=\>).*(?=\<\/)/g)[0].replace(/&nbsp;/g,' ');
      prov.push(stripTags(donnee));

    }
    data.push(prov);
  }
  return(data);
}

function stripTags (body) {

  var regex = /(<([^>]+)>)/ig;
  return body.replace(regex,"");

}