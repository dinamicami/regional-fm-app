import { midiasApi } from './Midias';

const GRAPHQL_ENDPOINT = 'https://regional-fm-api.herokuapp.com/api';
const maisPedidaAll = `
    {
        getMaisPedidaAll{
            id
            id_original
            criado_por
            criado_por_nome
            modificado
            ordem
            categoria
            status
            idioma
            data_para_entrada
            data_para_saida
            u_link
            musica
            artista
        }
    }
`;
export const maisPedidasApi = async () => {
    let response = await fetch(`${GRAPHQL_ENDPOINT}/mais-pedidas/?query=${maisPedidaAll}`);
    response = await response.json();

    let newArray = [];
    await response.data.getMaisPedidaAll.map(async item => {
        const midias = await midiasApi(item.id, 'mais_pedidas');
        newArray.push({ ...item, audioPath: midias[1].endereco, imagePath: midias[0].endereco });
    })

    return newArray;
};