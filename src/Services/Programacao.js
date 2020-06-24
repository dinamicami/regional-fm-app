import { midiasApi } from './Midias';

const GRAPHQL_ENDPOINT = 'https://regional-fm-api.herokuapp.com/api';
const programacao = `
  {
    getProgramacaoAll{
      id
      id_original
      criado_por
      criado_por_nome
      modificado
      ordem
      status
      categoria
      idioma
      data_para_entrada
      data_para_saida
      u_link
      programa
      inicio
      dias
      descricao
    }
  }
`;

export async function programacaoApi() {
  async function getFromAPI() {
    let response = await fetch(`${GRAPHQL_ENDPOINT}/programacao/?query=${programacao}`);
    response = await response.json();

    let newArray = await response.data.getProgramacaoAll.map(async (item) => {
      const midias = await midiasApi(parseInt(item.id), 'programacao');
      return ({ ...item, image: (await midias)[0].endereco });
    })

    return newArray;
  }
  
  const response = await getFromAPI();
  return response;
};
