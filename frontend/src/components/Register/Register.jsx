import './Register.css';
import { useState, useEffect } from "react";
import MapPanel from '../Map/MapPanel';
import api from '../../services/api';
import Axios from "axios";

function Register() {

    const [nome, setNome] = useState('');
    const [peso, setPeso] = useState(0);
    const [enderecoCliente, setEnderecoCliente] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [deliveries, setDeliveries] = useState([]);
    const [updatedDelivery, setUpdatedDelivery] = useState([]);
    const [loading, setLoading] = useState(true);
    const googleApiKey = "AIzaSyDuQbIBj2-a2dxQTDKbR9OzF0ftTEewETY"

    async function handleSearchAddress(e) {

        e.preventDefault();

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleApiKey}&address=${numero," ", enderecoCliente}`)
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                /* console.log(data.results[0])
                console.log(data.results[0].address_components.length) */

                for (var i = 0; i < data.results[0].address_components.length; i++) {
                    var tipo = data.results[0].address_components[i].types
                    

                   if( tipo[tipo.indexOf("route")] == "route"){
                    var googleRua = data.results[0].address_components[i].short_name
                    setLogradouro(googleRua)
                }
                if( tipo[tipo.indexOf("sublocality_level_1")] == "sublocality_level_1"){
                    var googleBairro = data.results[0].address_components[i].short_name
                    setBairro(googleBairro)
                }
                if( tipo[tipo.indexOf("administrative_area_level_2")] == "administrative_area_level_2"){
                    var googleCidade = data.results[0].address_components[i].short_name
                    setCidade(googleCidade)
                }
                if( tipo[tipo.indexOf("administrative_area_level_1")] == "administrative_area_level_1"){
                    var googleEstado = data.results[0].address_components[i].short_name
                    setEstado(googleEstado)
                }
                if( tipo[tipo.indexOf("country")] == "country"){
                    var googlePais = data.results[0].address_components[i].short_name
                    setPais(googlePais)
                }
                }

             setLatitude(data.results[0].geometry.bounds.northeast.lat)
             setLongitude(data.results[0].geometry.bounds.northeast.lng)
            })
            .catch((err) => {
                console.log(err);
            })
            /* console.log("OS DADOS: ", logradouro, numero, bairro, cidade, estado, pais, latitude, longitude) */

    }

    function handleRegisterDelivery(e) {

        e.preventDefault();

        const geolocalizacao = { latitude, longitude };

        const endereco = {
            logradouro,
            bairro,
            numero,
            cidade,
            estado,
            pais,
            geolocalizacao
        };

        api.post('/deliveries/register', {
            nome,
            peso,
            endereco
        })
            .then(response => {
                console.log(response.data.deliveries)
                setUpdatedDelivery([...deliveries, updatedDelivery])
                setNome('')
                setPeso('')
                setEnderecoCliente('')
                setNumero('')
                setLatitude('')
                setLongitude('')
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        api.get('/deliveries')
            .then((response) => {
                setDeliveries(response.data.deliveries)
                setLoading(false)
                console.log(response.data)
            })
    }, [updatedDelivery])

    async function handleDeleteDelivery(id) {
        if (window.confirm("Tem certeza que deseja deletar?")) {
            await api.delete(`/deliveries/${id}`)
                .then(response => {
                    const updated = deliveries.filter((deliveries) => deliveries._id != id)
                    setDeliveries(updated)
                    return response.data
                })
                .catch(error => {
                    console.log('Algo deu errado', error);
                })
        }

    }

    async function handleReset() {
        if (window.confirm("Tem certeza que deseja apagar todos os dados?")) {
            await api.delete('/removeall')
                .then(response => {
                    setDeliveries([])
                    console.log(response.data)
                })
                .catch(error => {
                    console.log('Algo deu errado', error);
                })
        }
    }

    return (
        <main className="main_container">
            <div className="register">
                <div className="form_container">
                    <form>
                        <input type="text"
                            id="nome_cliente"
                            name="nomeCliente"
                            placeholder="Nome Cliente"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            id="peso_entrega"
                            name="pesoEntrega"
                            placeholder="Peso da Entrega"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            required
                        />
                        <span className="container_search">
                            <input
                                type="text" id="enedereco_cliente"
                                name="enderecoCliente"
                                value={enderecoCliente}
                                placeholder="Endereço da Entrega"
                                onChange={(e) => setEnderecoCliente(e.target.value)}
                                required
                            />
                            &nbsp;
                            <input
                                type="text" id="numero"
                                name="numero"
                                value={numero}
                                placeholder="N°"
                                onChange={(e) => setNumero(e.target.value)}
                                required
                            />
                            <button id="btn_search" onClick={(e) => handleSearchAddress(e)}>Buscar</button>
                        </span>

                        <span className="geolocal">
                            <div>
                                <label htmlFor="latitude">latitude</label>
                                <input type="text"
                                    id="latitude"
                                    name="latitude"
                                    placeholder="Latitude"
                                    value={latitude}
                                    disabled
                                />
                            </div>
                            &nbsp;
                            <div>
                                <label htmlFor="longitude">longitude</label>
                                <input type="text"
                                    id="longitude"
                                    name="longitude"
                                    placeholder="Longitude"
                                    value={longitude}
                                    disabled
                                />
                            </div>
                        </span>

                        <button id="btn_register" onClick={(e) => handleRegisterDelivery(e)}>Registrar cliente</button>
                    </form>
                    <div className="reset-container">
                        <button id="btn-reset" onClick={(e) => handleReset()}>Resetar cadastro</button>
                    </div>
                </div>
            </div>

            <div className="panel">
                <div className="container_map">
                    <MapPanel deliveries={deliveries} />
                </div>
                <div className="load" style={{ textAlign: 'center' }}>
                    {loading && <p>carregando...</p>}
                </div>
                {deliveries.length > 0 &&
                    <div className="container_table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Rua</th>
                                    <th>Cidade</th>
                                    <th>País</th>
                                    <th>Peso</th>
                                    <th>Lat</th>
                                    <th>Lng</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveries.map(delivery => (
                                    <tr key={delivery._id}>
                                        <td>{delivery.nome}</td>
                                        <td>{delivery.endereco.logradouro}</td>
                                        <td>{delivery.endereco.cidade}</td>
                                        <td>{delivery.endereco.pais}</td>
                                        <td>{delivery.peso}</td>
                                        <td>{delivery.endereco.geolocalizacao.latitude}</td>
                                        <td>{delivery.endereco.geolocalizacao.longitude}</td>
                                        <td><button id="btn_delete_delivery" onClick={(e) => { handleDeleteDelivery(delivery._id) }}>Deletar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </main>
    )
}
export default Register


