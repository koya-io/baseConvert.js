$.baseConvert = function(val, from, to) {
   var error = "";
   var vars64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   var vars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   if (from <= 36) {
      val = val.toUpperCase();
   }
   if (from > 64 || to < 2 || to > 64 || from < 2) {
      error = "Error, selector out of bounds.";
   } else if (val.replace(/[^0-9a-zA-Z+/]/g, '').length != val.length) {
      error = "Error, invalid character.";
   } else {
      $.each((val + "").split(""), function(i, v) {
         if (from >= 63) {
            if (from == 63 && v == "/") {
               error = "Error, invalid character.";
            }
         } else {
            if (vars.indexOf(v) >= from) {
               error = "Error, invalid character.";
            }
         }
      });
   }
   if (error == "") {
      var working = bigInt(0);
      var final = "";
      val += "", from += "", to += "";
      $.each(val.split(""), function(i, v) {
         if (from >= 63) {
            var exponent = bigInt(val.length).minus(i).minus(1);
            var height = bigInt(from).pow(exponent);
            working = bigInt(vars64.indexOf(v)).multiply(height);
            working = bigInt(working).add(mediation);
            console.log(working + " = " + vars64.indexOf(v) + " * " + height + " ^ " + exponent);
         } else {
            var exponent = bigInt(val.length).minus(i).minus(1);
            var height = bigInt(from).pow(exponent);
            var mediation = bigInt(vars.indexOf(v)).multiply(height);
            working = bigInt(working).add(mediation);
            console.log(working + " = " + vars64.indexOf(v) + " * " + height + " ^ " + exponent);
         }
      });
      while (working > 0) {
         if (to >= 63) {
            final = vars64[bigInt(working).mod(to)] + "" + final;
         } else {
            final = vars[bigInt(working).mod(to)] + "" + final;
         }
         var mediation2 = bigInt(working).mod(to);
         bigInt(working).minus(mediation2);
         working = bigInt(working).divide(to);
      }
      return final;
   }
   return error;
}