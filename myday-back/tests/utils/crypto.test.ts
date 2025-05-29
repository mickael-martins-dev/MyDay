describe('POST /api/register', () => {
    it('devrait retourner 201 si name est fourni', async () => {
        expect(res.body).toHaveProperty('message', 'Utilisateur enregistré');
    });
});
