

export interface TlvSerializable {

    /**
     * after construct then can call serialize to serialize into buffer
     */
    serialize();

    /**
     * must run unserialize after get_tlv
     * @returns {Tlv_t1}
     */
    unserialize();
}
