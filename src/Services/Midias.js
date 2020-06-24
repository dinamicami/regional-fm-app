const GRAPHQL_ENDPOINT = 'https://regional-fm-api.herokuapp.com/api/mm-midias';

export const midiasApi = async ( id = null, pagina = null, page = null, pageSize = null, status = null, tipo = null ) => {
    const ID =      `pai: ${ id !== null ? id : '' },`,
        PAGINA =    `pagina: "${ pagina !== null ? pagina : "" }",`,
        PAGE =      `page: ${ page !== null ? page : '' },`,
        PAGESIZE =  `pageSize: ${ pageSize !== null ? pageSize : '' },`,
        STATUS =    `status: ${ status === null ? '' : status ? 1 : 0 },`,
        TIPO =      `tipo: ${ tipo !== null ? tipo : '' }`,
        midiasAll = `
            {
                getMmMidiasAll(
                    ${ id ? ID : '' }
                    ${ pagina ? PAGINA : '' }
                    ${ page ? PAGE : '' }
                    ${ pageSize ? PAGESIZE : '' }
                    ${ status ? STATUS : '' }
                    ${ tipo ? TIPO : '' }
                ){
                    endereco,
                    status
                }
            }
        `;
    async function consumirAPI (){
        let response = await fetch(`${GRAPHQL_ENDPOINT}/?query=${midiasAll}`);
        response = await response.json();
        return response;
    }
    return (
        await consumirAPI().then(data => {
            return data.data.getMmMidiasAll;
        })
    );
};