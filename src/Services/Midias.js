const GRAPHQL_ENDPOINT = 'https://regional-fm-api.herokuapp.com/api/mm-midias';

export const midiasApi = async ( id, pagina, page, pageSize, status, tipo ) => {
    const ID =      `pai: ${ id ? id : '' },`,
        PAGINA =    `pagina: "${ pagina ? pagina : "" }",`,
        PAGE =      `page: ${ page ? page : '' },`,
        PAGESIZE =  `pageSize: ${ pageSize ? pageSize : '' },`,
        STATUS =    `status: ${ status ? status : '' },`,
        TIPO =      `tipo: ${ tipo ? tipo : '' }`,
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
                    endereco
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