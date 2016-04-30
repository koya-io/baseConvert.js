jQuery.baseConvert = function(convert_val, convert_from, convert_to) {
   if(convert_from >= 2 && convert_from <= 64 && convert_to >= 2 && convert_to <= 64) {
      var convert_vars64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var convert_vars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var convert_workingnum = "", convert_finalnum = "";
      convert_workingnum = 0, convert_finalnum = "";
      convert_val += "";convert_from += "";convert_to += "";
      $.each(convert_val.split(""), function(i,v){
         if(convert_from >= 63) {
            convert_workingnum += (convert_vars64.indexOf(v) * Math.pow(convert_from, (convert_val.length - i - 1)));
         } else {
            convert_workingnum += (convert_vars.indexOf(v) * Math.pow(convert_from, (convert_val.length - i - 1)));
         }
      });
      while(convert_workingnum > 0) {
         if(convert_to >= 63) {
            convert_finalnum = convert_vars64[convert_workingnum % convert_to] + "" + convert_finalnum;
         } else {
            convert_finalnum = convert_vars[convert_workingnum % convert_to] + "" + convert_finalnum;
         }
         convert_workingnum -= convert_workingnum % convert_to;
         convert_workingnum /= convert_to;
      }
   }
   return convert_finalnum;
}