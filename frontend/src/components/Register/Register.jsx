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
    const [complemento, setComplemento] = useState('');
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
               /*  console.log(data.results[0])
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
                if( tipo[tipo.indexOf("postal_code")] == "postal_code"){
                    var googleCEP = data.results[0].address_components[i].short_name
                    setComplemento(googleCEP)
                }

                }

             setLatitude(data.results[0].geometry.location.lat)
             setLongitude(data.results[0].geometry.location.lng)
            })
            .catch((err) => {
                console.log(err);
            })
            /*  console.log("OS DADOS: ", logradouro, numero, bairro, cidade, estado, pais, latitude, longitude) */

    }

    function handleRegisterDelivery(e) {

        e.preventDefault();


        Axios.post("http://localhost:3333/deliveries", {
            nome,
            peso,
            logradouro,
            bairro,
            complemento,
            numero,
            cidade,
            estado,
            pais,
            latitude,
            longitude,
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

            setBairro ("")
            setLogradouro ("")
    }

    useEffect(() => {
        Axios.get("http://localhost:3333/getdeliveries")
            .then((response) => {
                setDeliveries(response.data)
                setLoading(false)
                console.log(response.data)
            })
    }, [updatedDelivery])

    async function handleDeleteDelivery(id) {
        if (window.confirm("Tem certeza que deseja deletar?")) {
            await Axios.delete(`"http://localhost:3333/deldeliveries/${id}`)
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
            await Axios.delete("http://localhost:3333/deldeliveries/")
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
                                        <td>{delivery.logradouro}</td>
                                        <td>{delivery.cidade}</td>
                                        <td>{delivery.pais}</td>
                                        <td>{delivery.peso}</td>
                                        <td>{delivery.latitude}</td>
                                        <td>{delivery.longitude}</td>
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


