export function format(value: string) {
  const formattedDocument =
    `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(9, 2)}`
  return formattedDocument
}

export async function validate(value: string) {
  if (value.length !== 14) return false;
  
  let cpf_str = value.trim();
  
  cpf_str = cpf_str.replace(/\./g, '');
  cpf_str = cpf_str.replace('-', '');
  const cpf_arr_str = cpf_str.split('');
  
  const cpf: Array<number> = [];
  
  for await(const item of cpf_arr_str) {
    cpf.push(parseInt(item));
  }
  
  let v1 = 0;
  let v2 = 0;
  let aux = false;
  
  for (var i = 1; cpf.length > i; i++) {
    if (cpf[i - 1] !== cpf[i]) {
      aux = true;   
    }
  } 
  
  if (aux === false) {
    return false; 
  } 
  
  for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
    v1 += cpf[i] * p; 
  } 
  
  v1 = ((v1 * 10) % 11);
  
  if (v1 === 10) {
    v1 = 0; 
  }
  
  if (v1 !== cpf[9]) {
    return false; 
  } 
  
  for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
    v2 += cpf[i] * p; 
  } 
  
  v2 = ((v2 * 10) % 11);
  
  if (v2 === 10) {
    v2 = 0; 
  }
  
  if (v2 !== cpf[10]) {
    return false; 
  }
  
  return true;
}